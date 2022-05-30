import * as anchor from "@project-serum/anchor";
import {Program} from "@project-serum/anchor";
import {AnchorHelloworld} from "../target/types/anchor_helloworld";
import * as assert from "assert";

describe("anchor-helloworld", () => {
  // Configure the client to use the local cluster.
  const anchorProvider = anchor.AnchorProvider.env();
  anchor.setProvider(anchorProvider);

  const program = anchor.workspace.AnchorHelloworld as Program<AnchorHelloworld>;
  // Add your test here.
  const baseAccount = anchor.web3.Keypair.generate();

  it("Creates a counter", async () => {
    const tx = await program.methods.create().accounts({
      baseAccount: baseAccount.publicKey,
      user: anchorProvider.wallet.publicKey,
    }).signers([baseAccount]).rpc();
    console.log("Your transaction signature", tx);

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 0: ', account.count.toString())
    assert.ok(account.count.toString() == '0');
  });

  it('increment the counter', async function () {
    const tx = await program.methods.increment().accounts({
      baseAccount: baseAccount.publicKey,
    }).rpc();
    console.log("increment signature ", tx)
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('count 1: ', account.count.toString())
    assert.ok(account.count.toString() == '1');
  });
});
