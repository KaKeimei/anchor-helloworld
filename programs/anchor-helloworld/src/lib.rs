use anchor_lang::prelude::*;

declare_id!("D1oA4g1uwn6QE24GxpsLixa5UaMn3oRNqUa4d91Qu7ru");

#[program]
pub mod anchor_helloworld {
    use anchor_lang::solana_program::entrypoint::ProgramResult;
    use super::*;

    pub fn create(ctx: Context<Create>) -> ProgramResult{
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult{
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;
        Ok(())
    }
}


#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>

}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>
}

#[account]
pub struct BaseAccount {
    pub count: u64,
}
