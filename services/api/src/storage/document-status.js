const TRANSITIONS = Object.freeze({
  pending_scan: new Set(["available", "quarantined", "rejected"]),
  available: new Set(["deleted", "quarantined"]),
  quarantined: new Set(["deleted", "available"]),
  rejected: new Set(["deleted"]),
  deleted: new Set()
});

export function canTransition(from, to) {
  return Boolean(TRANSITIONS[from]?.has(to));
}

export function assertTransition(from, to) {
  if (!canTransition(from, to)) {
    throw new Error(`invalid_document_transition:${from}->${to}`);
  }
  return true;
}
