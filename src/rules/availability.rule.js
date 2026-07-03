export function canReceiveInteraction({ presence, onQueue, routingStatus }) {
    return (
        presence?.toLowerCase() === "available" &&
        onQueue === true &&
        routingStatus?.toLowerCase() === "idle"
    );
}