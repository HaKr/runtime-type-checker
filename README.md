# Safely extract typed data from external sources

```typescript
const isPoint = (toe: unknown): toe is Point => {
			return (
				TypeChecks.isJsonObject(toe) &&
				TypeChecks.isNumber(toe.x) &&
				TypeChecks.isNumber(toe.y) &&
				TypeChecks.isNumber(toe.z)
			);
      };

const isPointArray = (toe: unknown): toe is Point[] => TypeChecks.isJsonArray(toe, isPoint);

const inputs = DefineInputs.fromData(
			{
				origin: { x: 0, y: 0, z: 0 },
				vertices: [
					{ x: 1, y: 2, z: 3 },
					{ x: -1, y: -3, z: -2 }
				]
			},

			{
				origin: { defineIf: isPoint },
				vertices: { defineIf: isPointArray }
			}
		);

```
