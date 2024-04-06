import {jobs} from "@/lib/dummyData";

export const searchJobs = async (querySearch, location ,page, numPages) => {
    const formattedSkills = querySearch.map(skill => encodeURIComponent(skill)).join('%20OR%20');
    const formattedLocation = encodeURIComponent(location);

    const url = `https://jsearch.p.rapidapi.com/search?query=${formattedSkills}%20in%20${formattedLocation}&page=${page}&num_pages=${numPages}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8a1326e09amshb6fa253ec61c44ap1a0580jsn385ebe3bbb1d',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return jobs.data;

    } catch (error) {
        console.error(error);
    }
};