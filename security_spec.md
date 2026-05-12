# Security Specification - Royal Vows

## Data Invariants
1. A guest name cannot be longer than 100 characters.
2. The number of guests must be one of the predefined values.
3. Attendance must be exactly 'yes' or 'no'.
4. RSVPs are immutable once created by a guest.
5. Guests cannot read other guests' RSVPs.

## The Dirty Dozen Payloads (Selection)
1. **The Over-sharer**: Create RSVP with a 1MB message. (Should fail size check)
2. **The Anonymous Spammer**: Create RSVP with no name. (Should fail required keys check)
3. **The Data Thief**: Attempt to list all documents in `rsvps`. (Should fail read access)
4. **The Saboteur**: Attempt to delete an existing RSVP. (Should fail write/delete access)
5. **The Impersonator**: Attempt to update someone else's RSVP. (Should fail update access)
6. **The Ghost Field**: Add `isVIP: true` to the payload. (Should fail strict keys/affectedKeys check)

## Proposed Rules Logic
- `rsvps`:
  - `allow create`: If `isValidRSVP(incoming())`.
  - `allow read, update, delete`: `false` (Default deny).
