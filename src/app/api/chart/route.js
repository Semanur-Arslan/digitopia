import axios from 'axios';

const api = axios.create({
  timeout: 10000,
});

const dataImpact = [
    {
        "id": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "name": "Case Study",
        "description": "Taster template for DMI product",
        "templateId": "60699206-0e16-4a2c-a284-7470072b7d9a",
        "productId": "d0947dfa-689d-486d-8b97-daa2f7ad5dc8",
        "editable": true,
        "organizationSolutionId": "a759cfe9-486c-4ebf-b777-048a574f47ef",
        "organizationId": "aba17c7b-a4f1-4a08-ae12-25f86876df12",
        "status": "COMPLETED",
        "percentage": 100,
        "viewOnly": false,
        "createdOn": "2024-09-05T08:01:02.554Z",
        "spocUserDetail": {
            "userId": "dcba3edf-b1f1-46b4-bf28-fcae64b9a4f4",
            "email": "semanurrrarslan@gmail.com",
            "firstName": "Candidate",
            "lastName": "Digitopia",
            "systemRoleId": 900
        },
        "impactRunSessions": null
    }
]

const retrieve = [
    {
        "id": "a8b973ff-5f5d-42ef-a52a-bc6fa68cccb3",
        "index": 1,
        "dimensionId": "e645b642-d4be-4f0a-9bd2-d2ee25748293",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 10,
        "importance": 2,
        "topicScore": 2.0,
        "topicBenchmark": 2.48,
        "scoreGap": 0.6,
        "sessionGap": 0.9,
        "topicRecommendation": {
            "id": "1aa33b73-9734-4d28-9fa0-f1e00220cd55",
            "dimensionId": null,
            "initiativeSize": "PR",
            "displayOrder": 12,
            "condition": null,
            "product": "DMI",
            "dimension": "Customer",
            "section": "Offerings",
            "topic": "Pricing",
            "recommendation": "Pricing Mastery Initiatives",
            "description": "Implement advanced pricing analytics to forecast demand, simulate pricing scenarios, and optimize pricing decisions. Use machine learning algorithms to develop personalized pricing strategies based on customer behavior, purchase history, and other relevant data points. Implement a pricing strategy framework such as Value-Based Pricing or Cost-Plus Pricing. Leverage advanced analytics to incorporate customer lifetime value into pricing. Set up personal and situational pricing mechanisms.\nUse pricing optimization tools to automate pricing decisions and maximize revenue.",
            "urgency": null,
            "importance": null,
            "capex": true,
            "opex": true,
            "recommendationType": "SYSTEM"
        }
    },
    {
        "id": "f280da48-1074-456d-9610-fb8ab6fa9289",
        "index": 2,
        "dimensionId": "3f0dddea-b2f1-4d1c-a806-ec3915b8283d",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 9,
        "importance": 8,
        "topicScore": 2.0,
        "topicBenchmark": 2.45,
        "scoreGap": 0.8,
        "sessionGap": 0.7,
        "topicRecommendation": {
            "id": "a464deb0-89f4-45f9-b893-c5bd476b1e55",
            "dimensionId": null,
            "initiativeSize": "BB",
            "displayOrder": 190,
            "condition": null,
            "product": "DMI",
            "dimension": "People",
            "section": "Capabilities",
            "topic": "Training / Learning & Development",
            "recommendation": "Training and Development: Enrichment and Extension",
            "description": "Enrich personal and occupational development programs. Broaden the scope of development programs and extend them to everyone across the enterprise. Allocate a budget to fulfill a wide range of development needs. Empower employees to take ownership of their own development by providing access to self-directed learning resources, such as online courses, books, and podcasts. Personalize development plans for each employee based on their career goals, strengths, and weaknesses by providing individualized coaching and mentoring. Utilize technology to deliver personalized and interactive learning experiences, such as gamification, simulations, and virtual reality. Foster a learning culture by creating opportunities for employees to share knowledge and expertise with each other, such as through peer-to-peer mentoring and knowledge sharing platforms.",
            "urgency": null,
            "importance": null,
            "capex": true,
            "opex": true,
            "recommendationType": "SYSTEM"
        }
    },
    {
        "id": "569bf68a-5c25-4872-91ad-df932c561783",
        "index": 3,
        "dimensionId": "e645b642-d4be-4f0a-9bd2-d2ee25748293",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 8,
        "importance": 10,
        "topicScore": 2.0,
        "topicBenchmark": 2.32,
        "scoreGap": 1.1,
        "sessionGap": 0.9,
        "topicRecommendation": {
            "id": "680d1005-333f-4a25-a6c9-ebbc22c13fde",
            "dimensionId": null,
            "initiativeSize": "PR",
            "displayOrder": 2,
            "condition": null,
            "product": "DMI",
            "dimension": "Customer",
            "section": "Analytics",
            "topic": "Customer Data",
            "recommendation": "Customer Data Excellence ",
            "description": "Plan and execute improvements on data richness. \nEvaluate current data capturing abilities and identify areas for improvement in data richness and completeness.\nExplore external platforms and systems to enhance the scope and depth of customer data collection.\nAdvance teams' tools and skills for structuring unstructured data, including natural language processing and machine learning.\nProvide training to employees on advanced data analysis techniques and best practices for using customer data to inform business decisions.",
            "urgency": null,
            "importance": null,
            "capex": false,
            "opex": false,
            "recommendationType": "SYSTEM"
        }
    },
    {
        "id": "b8112621-6303-45e6-b4a6-3bcf1006ee32",
        "index": 4,
        "dimensionId": "e645b642-d4be-4f0a-9bd2-d2ee25748293",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 7,
        "importance": 9,
        "topicScore": 2.1,
        "topicBenchmark": 2.41,
        "scoreGap": 0.9,
        "sessionGap": 0.9,
        "topicRecommendation": {
            "id": "d8f70152-0614-41e7-963a-660e430dd74f",
            "dimensionId": null,
            "initiativeSize": "PR",
            "displayOrder": 24,
            "condition": null,
            "product": "DMI",
            "dimension": "Customer",
            "section": "Experience",
            "topic": "Customer Journeys",
            "recommendation": "Customer Journey Enhancement",
            "description": "Map customer journeys to experience pillars. Continuously monitor and optimize the customer journey across all touchpoints using advanced analytics and automation tools such as customer journey analytics, machine learning, and artificial intelligence. Implement personalized experiences based on customer preferences, behaviors, and feedback, leveraging tools such as customer journey mapping, marketing automation platforms, and personalization engines. Use customer data and analytics to identify and predict customer needs and preferences, and to proactively offer tailored solutions and support.",
            "urgency": null,
            "importance": null,
            "capex": false,
            "opex": false,
            "recommendationType": "SYSTEM"
        }
    },
    {
        "id": "8bcc771e-82d0-493b-8bd7-891d759f6630",
        "index": 5,
        "dimensionId": "37036dd7-5d87-4641-aca4-e7afbe3d8208",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 6,
        "importance": 6,
        "topicScore": 2.1,
        "topicBenchmark": 2.36,
        "scoreGap": 0.8,
        "sessionGap": 0.8,
        "topicRecommendation": {
            "id": "adc7389e-c166-4fde-aa46-b49e6709edb6",
            "dimensionId": null,
            "initiativeSize": "BB",
            "displayOrder": 64,
            "condition": null,
            "product": "DMI",
            "dimension": "Operations",
            "section": "Processes",
            "topic": "Internal Processes",
            "recommendation": "Seamless Internal Processes",
            "description": "Develop a roadmap for process excellence with clear goals and objectives. Conduct a process audit to identify opportunities for improvement. Implement advanced process automation tools to reduce manual effort and increase efficiency. Establish a process governance framework to ensure compliance and control. Implement a process improvement culture with regular training and continuous improvement initiatives.",
            "urgency": null,
            "importance": null,
            "capex": true,
            "opex": true,
            "recommendationType": "SYSTEM"
        }
    },
    {
        "id": "68d143d2-5a88-49b8-b799-35bd5ebb78b8",
        "index": 6,
        "dimensionId": "3f0dddea-b2f1-4d1c-a806-ec3915b8283d",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 5,
        "importance": 4,
        "topicScore": 2.2,
        "topicBenchmark": 2.43,
        "scoreGap": 0.7,
        "sessionGap": 0.7,
        "topicRecommendation": {
            "id": "dedf1329-902b-4dfd-91e4-251d6ac2d0ec",
            "dimensionId": null,
            "initiativeSize": "BB",
            "displayOrder": 180,
            "condition": null,
            "product": "DMI",
            "dimension": "People",
            "section": "Culture",
            "topic": "Agile Organisation",
            "recommendation": "Agility Increase",
            "description": "Encourage a culture of continuous improvement and encourage employees to experiment with new agile methodologies and practices. Identify new ways of working that can further enhance agility. Evaluate how agile methodologies can be scaled to the enterprise level, and develop processes for managing multiple agile teams to ensure consistency and alignment across the organization. Foster agile leadership by encouraging leaders to adopt an agile mindset and lead by example to create a culture of agility throughout the organization. Develop / reevaluate metrics to measure the success of agile working, and use these metrics to identify areas for improvement. Ensure that the organization is continuously improving its agility and achieving its goals.",
            "urgency": null,
            "importance": null,
            "capex": true,
            "opex": false,
            "recommendationType": "SYSTEM"
        }
    },
    {
        "id": "3f4fe9c6-9a3a-4bfa-bc36-7b849dfa1b2f",
        "index": 7,
        "dimensionId": "37036dd7-5d87-4641-aca4-e7afbe3d8208",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 4,
        "importance": 7,
        "topicScore": 2.2,
        "topicBenchmark": 2.41,
        "scoreGap": 0.8,
        "sessionGap": 0.8,
        "topicRecommendation": {
            "id": "b6fd4300-82be-42b1-af82-4b10e177c426",
            "dimensionId": null,
            "initiativeSize": "PR",
            "displayOrder": 140,
            "condition": null,
            "product": "DMI",
            "dimension": "Operations",
            "section": "Analytics",
            "topic": "Analytical Applications",
            "recommendation": "Advanced Analytical Applications",
            "description": "Continue to focus on integrating their systems to gain deeper insights into  operations and optimize processes. Consider investing in advanced technologies such as big data analytics, artificial intelligence, and machine learning to gain a deeper understanding of operations and optimize processes. Foster a data-driven culture that encourages employees to use data and analytics to inform decisions. Provide training, set goals and incentives, and create an environment that supports the use of data and analytics.",
            "urgency": null,
            "importance": null,
            "capex": true,
            "opex": true,
            "recommendationType": "SYSTEM"
        }
    },
    {
        "id": "473cdc53-0392-4e4c-b08c-21363dc9727f",
        "index": 8,
        "dimensionId": "37036dd7-5d87-4641-aca4-e7afbe3d8208",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 3,
        "importance": 3,
        "topicScore": 2.3,
        "topicBenchmark": 2.51,
        "scoreGap": 0.7,
        "sessionGap": 0.8,
        "topicRecommendation": {
            "id": "d64aab7f-c4a1-4c8f-9560-a1916b3e9604",
            "dimensionId": null,
            "initiativeSize": "PR",
            "displayOrder": 148,
            "condition": null,
            "product": "DMI",
            "dimension": "Operations",
            "section": "Analytics",
            "topic": "Operational Dashboards",
            "recommendation": "Operational Dashboards Enhancements for Greater Performance",
            "description": "Enhance the use of insightful dashboards across the enterprise. Make dashboards available real-time across devices. Automate the process of collecting and analyzing data, reducing the reliance on manual data entry and processing. Integrate rich data sources both form inside and outside the organization for greater insights. Enhance predictive and simulation capabilities of models that feed the dashboards. Implement real-time alerts that notify users of significant changes in key metrics. Design dashboards with due care to user interface (UI) and user experience (UX). Improve the data visualization techniques used in the dashboards, making them more engaging and easier to understand. Allow users to create custom dashboards tailored to their specific needs. Continuously review and improve the dashboards based on user feedback and changing business requirements. Explore the potential of AI and machine learning to make the dashboards more autonomous, enabling them to learn and adapt based on user behavior and changing business needs.",
            "urgency": null,
            "importance": null,
            "capex": false,
            "opex": false,
            "recommendationType": "SYSTEM"
        }
    },
    {
        "id": "eaaa0286-b8a4-4603-9cb6-b2ab0b00c7f7",
        "index": 9,
        "dimensionId": "3f0dddea-b2f1-4d1c-a806-ec3915b8283d",
        "impactRunId": "5c4f5bd8-5c6a-40d3-9499-433b96a8101e",
        "deleted": false,
        "urgency": 2,
        "importance": 5,
        "topicScore": 2.2,
        "topicBenchmark": 2.22,
        "scoreGap": 0.7,
        "sessionGap": 0.7,
        "topicRecommendation": {
            "id": "6559efc9-9585-411d-a41a-bdfa5fb36df2",
            "dimensionId": null,
            "initiativeSize": "PR",
            "displayOrder": 202,
            "condition": null,
            "product": "DMI",
            "dimension": "People",
            "section": "Analytics",
            "topic": "People Analytics",
            "recommendation": "Organisational / People Analysis Mastery",
            "description": "Improve analytical skills to accurately run churn, engagement, motivation, fit-to-role and similar studies. Make sure employee journeys are backed and improved by advanced analytics. Broaden the scope of methodologies to gather richer data on organization and people. Draft an action plan to improve analytical skills to generate insights on people. Utilize the insights to improve employee journeys. starting with regular and standardized employee surveys. These surveys can collect feedback on engagement, job satisfaction, and other relevant topics. The data collected can be used to identify areas for improvement and to track progress over time. It is also important to ensure that data is collected consistently and accurately across the organization. Leverage a range of methodologies to increase the breadth and depth of their analyses, including not only employee surveys, but also other data sources such as performance metrics, turnover data, and social media interactions. By using a variety of data sources, gain a more complete understanding of the workforce and identify areas for improvement. Consider having a dedicated team with expertise in data analysis and the ability to communicate findings effectively to relevant stakeholders. Leverage predictive analytics to identify and address issues before they become problems.",
            "urgency": null,
            "importance": null,
            "capex": true,
            "opex": false,
            "recommendationType": "SYSTEM"
        }
    }
]

export const getImpactRunList = async (token) => {
  
//    try {
//      const response = await axios.get('http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8484/impact-runs', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//      });
//      return response.data;
//    } catch (error) {
//      throw error;
//    }
 return dataImpact;
};

export const getRetrieveList = async (token, impactRunId) => {
  
    //   try {
    //     const response = await axios.get(`http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8283/impact-run/${impactRunId}/recommendations`, {
    //      headers: {
    //        Authorization: `Bearer ${token}`
    //      }
    //     });
    //     return response.data;
    //   } catch (error) {
    //     throw error;
    //   }
    return retrieve;
    };


export default api;
