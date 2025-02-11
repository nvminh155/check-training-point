


export const dateIsExpiry = (date: string) => {
    const currentDate = new Date();
    const expiryDate = new Date(date);
    // console.log(expiryDate,  currentDate.getTime() > expiryDate.getTime())
    return currentDate.getTime() > expiryDate.getTime();
}