export function canReceiveInteraction({ presence, onQueue, routingStatus }) {
    return (
        presence === "Available" &&
        onQueue === true &&
        routingStatus === "IDLE"
    );
}