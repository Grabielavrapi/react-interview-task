// Fake API për fetch
export const fetchJobsites = async () => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return new Promise(resolve => resolve(mockData.jobsites));
};