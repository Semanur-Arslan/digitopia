import axios from 'axios';

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
  try {
    const response = await axios.get(`api/profileDetails`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
  return org;
};

export default api;
