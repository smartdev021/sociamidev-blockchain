export const GetHours12 = (date) => { return (date.getHours() + 24) % 12 || 12; }
export const GetAmPM = (date) => {
    const Noon = new Date(date.getFullYear(), date.getMonth(), date.getDate() , 12, 0, 0);
    (date.getTime() < Noon.getTime()) ? 'am' : 'pm'
};