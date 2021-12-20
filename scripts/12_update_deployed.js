async function main(network) {

    console.log('network: ', network.name);

    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    console.log(`Deployer's address: `, deployerAddress);
  
    const { TREASURY_ADDRESS, PLATFORM_FEE, WRAPPED_FTM_MAINNET, WRAPPED_FTM_TESTNET, MARKETPLACE, BUNDLE_MARKETPLACE, FANTOM_ADDRESS_REGISTRY, AUCTION, TOKEN_REGISTRY, NFTHAB, FACTORY, PRICE_FEED } = require('../constants');

    const Marketplace = await ethers.getContractFactory('FantomMarketplace');
    const marketplaceImpl = await Marketplace.attach(MARKETPLACE);

    const BundleMarketplace = await ethers.getContractFactory(
        'FantomBundleMarketplace'
      );
    const bundleMarketplaceImpl = await BundleMarketplace.attach(BUNDLE_MARKETPLACE);

    const Auction = await ethers.getContractFactory('FantomAuction');
    const auctionImpl = await Auction.attach(AUCTION);

    const AddressRegistry = await ethers.getContractFactory('FantomAddressRegistry');
    const addressRegistry = await AddressRegistry.attach(FANTOM_ADDRESS_REGISTRY);

    await marketplaceImpl.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);   
    await bundleMarketplaceImpl.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);
    
    await auctionImpl.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);
    
    await addressRegistry.updateNFTHab(NFTHAB);
    await addressRegistry.updateAuction(AUCTION);
    await addressRegistry.updateMarketplace(MARKETPLACE);
    await addressRegistry.updateBundleMarketplace(BUNDLE_MARKETPLACE);
    await addressRegistry.updateNFTFactory(FACTORY);
    await addressRegistry.updateTokenRegistry(TOKEN_REGISTRY);
    await addressRegistry.updatePriceFeed(PRICE_FEED);

    await tokenRegistry.add(WRAPPED_FTM_MAINNET);

}