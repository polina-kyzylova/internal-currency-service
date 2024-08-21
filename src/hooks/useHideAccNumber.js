export default function useHideAccNumber(number) {
    const hideNumber = number.replace(number.slice(0, number.length - 4), '*'.repeat(number.length - 4));
    return hideNumber;
}
