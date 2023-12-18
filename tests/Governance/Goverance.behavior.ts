
import { ethers } from "hardhat";
import { expect } from "chai";
import {
    EventLog,
} from "ethers";
import { mine } from "@nomicfoundation/hardhat-network-helpers";


const validProposal :(this:any) => Promise<T> = async function (this:any) {
    // Assuming `this` has necessary contract instances and signers
    const { governor, token, signers } = this;

    // Define proposal parameters
    const targets = [token.address];
    const values = [0];
    const calldatas = [token.interface.encodeFunctionData("mint", [signers.admin.address, 1000])];
    const description = "Proposal #1: Mint 1000 tokens";

    // Create proposal
    const createTx = await governor.propose(targets, values, calldatas, description);
    const receipt = await createTx.wait();
    
    // Expect a ProposalCreated event
    expect(receipt.events.some((e) => e.event === "ProposalCreated")).to.be.true;

    // Extract the proposalId from the event
    const proposalId = receipt.events.find((e) => e.event === "ProposalCreated").args.proposalId;
    expect(proposalId).to.exist;

    this.proposalId = proposalId;
}

export async function shouldBehaveLikeGovernor(): Promise<void> {
    it("should receive answer from CLOCK_MODE", async function () {
        const { governor, _, } = this;

        const clock_mode = await governor.CLOCK_MODE();

        expect(clock_mode).to.be.equal("mode=blocknumber&from=default");
    });

    it("clock should return the current block number", async function () {
        const { governor, _, } = this;

        const clock = await governor.clock();
        const pBlock = await ethers.provider.getBlock("latest");

        expect(clock).to.be.equal(pBlock?.number);
    });

    it("should mint 10000 tokens", async function () {
        const { token, signers,t } = this;

        const amountToMint = 10000n;
        await token.mint(signers.admin, amountToMint);

        const balance = await token.balanceOf(signers.admin.address);
        expect(balance).to.be.equal(amountToMint);
    });

    it("should work with current permissions, proposal to mint more tokens", async function () {
        const { token, governor, signers, timelock } = this;

        // initial mint
        const amountToMint = 10000n;
        await token.mint(signers.admin, amountToMint);

        const balanceOne = await token.balanceOf(signers.admin.address);
        expect(balanceOne).to.be.equal(amountToMint);

        // delegate
        await token.delegate(signers.admin.address);

        expect(await token.grantRole(await token.MINTER_ROLE(), await timelock.getAddress())).to.emit(token, "RoleGranted");
        // expect(await token.grantRole(await token.MINTER_ROLE(), await governor.getAddress())).to.emit(token, "RoleGranted");

        const calldata = token.interface.encodeFunctionData("mint", [signers.admin.address, 1000n]);

        // Propose
        const proposalTx = await governor.propose(
            [await token.getAddress()], // targets 
            [0n], // value
            [calldata],
            "Proposal to mint 1000 tokens for admin"// description
        );

        expect(proposalTx).to.emit(governor, "ProposalCreated");

        // Wait for the transaction to be mined
        const receipt = await proposalTx.wait(1);

        // console.log("proposalId",receipt?.logs);

        const eventLogs: EventLog[] = (receipt?.logs ?? []).filter((log): log is EventLog => true);

        // Find the ProposalCreated event in the transaction receipt
        const event = eventLogs.find((log) => log.fragment.name === "ProposalCreated");

        const logDescription = governor.interface.parseLog({
            topics: event?.topics ? [...event.topics] : [],
            data: event?.data ?? "",
        });

        // Get the proposalId from the event arguments
        const proposalId = logDescription?.args["proposalId"]

        const numberOfBlocks = Number(await governor.votingDelay()) + 100;
        await mine(numberOfBlocks);

        // Vote
        expect( await governor.castVote(proposalId, 1n)).to.emit(governor, "VoteCast");

        // Wait for voting period to end
        // await ethers.provider.send("evm_increaseTime", [86400]); // Increase time by 1 day
        // await ethers.provider.send("evm_mine"); // Mine a new block
        await mine(Number(await governor.votingPeriod()) + 100);

        // Queue proposal
        expect(await governor.queue(proposalId)).to.emit(governor, "ProposalQueued");

        // Simulate time delay required before execution
        // Replace 'executionDelay' with your contract's specific delay
        await mine( 86400 +1);

        console.log("proposalId status", await governor.state(proposalId));

        // Execute proposal
        expect(await governor.execute(proposalId)).to.emit(governor, "ProposalExecuted");

        // Check if admin's balance has increased
        const balance = await token.balanceOf(signers.admin.address);
        expect(balance).to.be.equal(11000n);
    });


    it("should allow creation of valid proposals", async function () {
        await validProposal(this);
    });

    it("should allow eligible voters to cast votes", async function () {
        await validProposal(this);

        // Assuming a proposal has been created and `proposalId` is available
        const { governor, proposalId } = this;
    
        // Cast a vote (1 for 'For')
        await governor.castVote(proposalId, 1);
    
        // Check the vote count
        const proposalVotes = await governor.proposalVotes(proposalId);
        expect(proposalVotes.forVotes).to.be.greaterThan(0);
    });
    
}