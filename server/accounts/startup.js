var createServiceConfiguration;

createServiceConfiguration = function(service, clientId, secret) {
  var config;
  ServiceConfiguration.configurations.remove({
    service: service
  });
  config = {
    generic: {
      service: service,
      clientId: clientId,
      secret: secret
    },
    facebook: {
      service: service,
      appId: clientId,
      secret: secret
    },
    twitter: {
      service: service,
      consumerKey: clientId,
      secret: secret
    }
  };
  switch (service) {
    case 'facebook':
      return ServiceConfiguration.configurations.insert(config.facebook);
    case 'twitter':
      return ServiceConfiguration.configurations.insert(config.twitter);
    default:
      return ServiceConfiguration.configurations.insert(config.generic);
  }
};


createServiceConfiguration('facebook', '1725431744356376', 'c0b0dcdc1611999a246d0a251647b0ec');
createServiceConfiguration('google', '513547070841-p1783f5mnjbf3av128i0b8974933tfdh.apps.googleusercontent.com', 'cySSkuX1zq5sInZXa77ZGd7C');
createServiceConfiguration('twitter', 'QJy2FyGrfHQXvPDijnS150tFd', 'IXqLVr7f7txMNCIUmJRS2Cp0TUK21VTfoDZwXYWZWbsoF0ULFv');
