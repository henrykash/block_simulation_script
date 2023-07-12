
if (!process.env.JSON_RPC_URL || !process.env.WSS_URL) {
    console.info("Please kindly provide your WSS_URL,JSON_RPC_URL in your dotenv")

}
export const config = {
    WSS_URL: process.env.WSS_URL!,
    JSON_RPC_URL: process.env.JSON_RPC_URL!
}