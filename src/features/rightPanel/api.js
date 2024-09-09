import axios from 'axios';

const org = {
  "id": "aba17c7b-a4f1-4a08-ae12-25f86876df12",
  "name": "Frontend Developer",
  "countryId": "1b77f588-8636-462d-a40f-eea1690469e0",
  "industryId": "0e4fb431-54cc-49c2-b4ce-42cd05e2234d",
  "parentId": "6fce0ae9-58dc-4e0e-b513-fdc7c658a54d",
  "children": [],
  "createdOn": "2024-09-05 07:56:14.185",
  "createdById": "dcba3edf-b1f1-46b4-bf28-fcae64b9a4f4",
  "logoUrl": null
}

const api = axios.create({
  timeout: 10000,
});

export const getIndustries = async () => {
  
   try {
     const response = await axios.get('http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/industries');
     return response.data;
   } catch (error) {
     throw error;
   }

};

export const getCountries = async () => {
   try {
     const response = await axios.get('http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/countries');
     return response.data;
   } catch (error) {
     throw error;
   }
};

export const getOrganizationDetails = async (organizationId, token) => {
  // try {
  //   const response = await axios.get(`http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8181/organization/${organizationId}/detail`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   return response.data;
  // } catch (error) {
  //   throw error;
  // }
  return org;
};

export default api;
