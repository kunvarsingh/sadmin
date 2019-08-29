export const API_URL = 'https://sallon.herokuapp.com/';

export const jsonApiHeader = (accessToken, ContentType, businessNameCheck) => {

  return {
    'businessToken': businessNameCheck ? businessNameCheck : null,
    'Content-Type': ContentType ? ContentType : 'application/vnd.api+json',
    'Authorization': accessToken ? `Bearer ${accessToken}` : '',
    // 'Timezone': calculateLocalTimeZone(),
    // 'IPAddress': GlobalVariables.IpAddress,
    // 'LocationID': GlobalVariables.CurrentLocationId ? GlobalVariables.CurrentLocationId : 0,
  };
};
