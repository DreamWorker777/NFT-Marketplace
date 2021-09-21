import Web3 from "web3";
let  initweb3;
// if(typeof initweb3 !== 'undefined') {
//     initweb3 = new Web3(initweb3.currentProvider)
// }else{
//     initweb3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
// }

// async function initweb3Gen () {
//     window.addEventListener("load",
//         async () => {
//             if(window.ethereum) {
//                 const web3 = new Web3(window.ethereum);
//                 try {
//                     await window.ethereum.enable();
//                     // resolve(web3);
//                     initweb3 = web3;
//                 } catch (err) {
//                     // reject(err);
//                     console.log(err);
//                 }
//             } else if (window.web3) {
//                 const web3 = window.web3;
//                 console.log("Injected web3 detected.");
//                 // resolve(web3)
//                 initweb3 = web3;
//             } else {
//                 const provider = new Web3.providers.HttpProvider(
//                     'http://127.0.0.1:8545'
//                 );
//                 const web3 = new Web3(provider);
//                 console.log("No web3 instace injected, using Infura/Local web3.");
//                 // resolve(web3);
//                 initweb3 = web3;
//             }
//         // }
//         })
// }

// initweb3Gen();
console.log('myweb3', initweb3);



const getWeb3 = () =>
    new Promise((resolve) => {
        // setTimeout(console.log('loadedInit', initweb3), 3000);
        // resolve(initweb3)
        const web3 = new Web3(window.ethereum);
        try {
        window.ethereum.enable();
        resolve(web3);
        initweb3 = web3;
        } catch (err) {
        // reject(err);
        console.log(err);
        }
        console.log(window);
        // resolve(web3);
    })

const getWallets = () => 
    new Promise((resolve, reject) => {
        initweb3.eth.getAccounts((err, res) => {
            if (!err) return resolve(res)
            reject(err)
        })
    })

export { getWallets, getWeb3, initweb3 }