## Architectural Decision

### Decision

Use an Internal Schema Model as the single source of truth.

### Alternatives Considered

- Generate SQL directly from the canvas.
- Maintain separate models for each database type.

### Why This Approach?

- Simplifies support for multiple databases.
- Keeps the canvas independent of database syntax.
- Makes adding new export targets straightforward.
- Reduces duplication in export logic.

### Trade-offs

- Requires an additional transformation layer.
- Slightly increases implementation complexity.

### Impact

Future export targets (Prisma, Drizzle, SQL Server, etc.) can be added without modifying the canvas or editor.