const defaultSkills = [
"JavaScript", 
"AJAX", 
"Blockchain", 
"Full-Stack", 
"NodeJS", 
"ReactJS", 
"XML", 
"NoSQL", 
"MySQL", 
"PHP", 
"HTML5",
"CSS3", 
"Internet Security", 
"Unix", 
"NPM", 
"Crypto-Currency", 
"Python", 
"Bitcoin", 
"Machine Learning",
"Spring",
"JDK"];

let defaultRoadmaps = [];

function generateRoadmap(newName, newSkills) {
    let roadmap = {name: newName, skills: newSkills};

    return roadmap;
}

defaultRoadmaps.push(generateRoadmap("Blockchain", [defaultSkills[15], defaultSkills[17], defaultSkills[16], defaultSkills[2]]));
defaultRoadmaps.push(generateRoadmap("Java", [defaultSkills[19], defaultSkills[20]]));
defaultRoadmaps.push(generateRoadmap("JavaScript", [defaultSkills[0], defaultSkills[1], defaultSkills[5], , defaultSkills[6], defaultSkills[10]]));
defaultRoadmaps.push(generateRoadmap("HTML", [defaultSkills[0], defaultSkills[1], defaultSkills[5], , defaultSkills[6], defaultSkills[10]]));
defaultRoadmaps.push(generateRoadmap("NodeJS", [defaultSkills[4], defaultSkills[0]]));
defaultRoadmaps.push(generateRoadmap("Node", [defaultSkills[4], defaultSkills[0]]));
defaultRoadmaps.push(generateRoadmap("Back-End", [defaultSkills[4], defaultSkills[0]]));
defaultRoadmaps.push(generateRoadmap("Backend", [defaultSkills[4], defaultSkills[0]]));
defaultRoadmaps.push(generateRoadmap("Front-End", [defaultSkills[0], defaultSkills[5], defaultSkills[10], defaultSkills[11]]));
defaultRoadmaps.push(generateRoadmap("FrontEnd", [defaultSkills[0], defaultSkills[5], defaultSkills[10], defaultSkills[11]]));
defaultRoadmaps.push(generateRoadmap("ReactJS", [defaultSkills[0], defaultSkills[5], defaultSkills[10], defaultSkills[11]]));
defaultRoadmaps.push(generateRoadmap("React", [defaultSkills[0], defaultSkills[5], defaultSkills[10], defaultSkills[11]]));
defaultRoadmaps.push(generateRoadmap("Full-Stack", [defaultSkills[3], defaultSkills[0], defaultSkills[4], defaultSkills[5], defaultSkills[7], defaultSkills[8]]));
defaultRoadmaps.push(generateRoadmap("FullStack", [defaultSkills[3], defaultSkills[0], defaultSkills[4], defaultSkills[5], defaultSkills[7], defaultSkills[8]]));
defaultRoadmaps.push(generateRoadmap("Machine Learning", [defaultSkills[18], defaultSkills[16], defaultSkills[7]]));
defaultRoadmaps.push(generateRoadmap("Blockchain", [defaultSkills[15], defaultSkills[17], defaultSkills[16], defaultSkills[2]]));
defaultRoadmaps.push(generateRoadmap("Java", [defaultSkills[19], defaultSkills[20]]));
defaultRoadmaps.push(generateRoadmap("JavaScript", [defaultSkills[0], defaultSkills[1], defaultSkills[5], , defaultSkills[6], defaultSkills[10]]));
defaultRoadmaps.push(generateRoadmap("JavaScript", [defaultSkills[0], defaultSkills[1], defaultSkills[5], , defaultSkills[6], defaultSkills[10]]));
defaultRoadmaps.push(generateRoadmap("Java", [defaultSkills[4], defaultSkills[0]]));
defaultRoadmaps.push(generateRoadmap("Front-End", [defaultSkills[0], defaultSkills[5], defaultSkills[10], defaultSkills[11]]));
defaultRoadmaps.push(generateRoadmap("FrontEnd", [defaultSkills[0], defaultSkills[5], defaultSkills[10], defaultSkills[11]]));
defaultRoadmaps.push(generateRoadmap("ReactJS", [defaultSkills[0], defaultSkills[5], defaultSkills[10], defaultSkills[11]]));
defaultRoadmaps.push(generateRoadmap("React", [defaultSkills[0], defaultSkills[5], defaultSkills[10], defaultSkills[11]]));
defaultRoadmaps.push(generateRoadmap("Full-Stack", [defaultSkills[3], defaultSkills[0], defaultSkills[4], defaultSkills[5], defaultSkills[7], defaultSkills[8]]));
defaultRoadmaps.push(generateRoadmap("FullStack", [defaultSkills[3], defaultSkills[0], defaultSkills[4], defaultSkills[5], defaultSkills[7], defaultSkills[8]]));
defaultRoadmaps.push(generateRoadmap("Machine Learning", [defaultSkills[18], defaultSkills[16], defaultSkills[7]]));

let RoadmapHelper = {
    findMatchingRoadmaps(name) {
        let matchingRoadmaps = [];

        for (let i = 0; i < defaultRoadmaps.length; ++i) {
            if (defaultRoadmaps[i].name.toLowerCase().indexOf(name.toLowerCase()) != -1){
                matchingRoadmaps.push(defaultRoadmaps[i]);
            }
        }

        return matchingRoadmaps;
    }
}

export default RoadmapHelper;