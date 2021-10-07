import Web3 from "web3";
let  initweb3;

const getWeb3 = () =>
    new Promise((resolve) => {
        const web3 = new Web3(window.ethereum);
        try {
            window.ethereum.enable();
            resolve(web3);
            initweb3 = web3;
        } catch (err) {
            console.log(err);
        }
        console.log(window);
    })

const getWallets = () => 
    new Promise((resolve, reject) => {
        initweb3.eth.getAccounts((err, res) => {
            if (!err) return resolve(res)
            reject(err)
        })
    })

export { getWallets, getWeb3, initweb3 }