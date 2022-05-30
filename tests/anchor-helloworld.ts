import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorHelloworld } from "../target/types/anchor_helloworld";

describe("anchor-helloworld", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorHelloworld as Program<AnchorHelloworld>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});