import { canReceiveInteraction } from "../rules/availability.rule.js";

export function mapAgent(user, extraData = {}) {
    const presence = user.presence?.presenceDefinition?.id || "Unknown";
    const routingStatus = user.routingStatus?.status || "UNKNOWN";
    const onQueue = extraData.onQueue ?? false;

    return {
        agentId: user.id,
        fullName: user.name,
        email: user.email,
        division: user.division?.name || "N/A",
        queues: extraData.queues || [],
        presence: presence,
        routingStatus: routingStatus,
        onQueue,
        canReceiveInteraction: canReceiveInteraction({
            presence,
            onQueue,
            routingStatus
        })
    };
}