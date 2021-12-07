
# conway-game-of-life-3

- don't store parameter that you are storing in another variable so that you have one source of truth 
- one less point of confusion 

1. stack memory 
2. heap memory

- One of it have more constraints?
- All class instances are stored in one of it (which is more scarce memory)
- anything that is reusable is recommended to be stored as static, so that we will not recreate it in every instance initialization 
- Pure function can be used as static

- When you want to compare worlds -> Are they the same?
- Immutability can be a cheap OR expensive process depending on how we process the code 
- immutability vs mutability
- Immutability is strongly recommended in React so that it is a cheaper process to calculate whether to rerender the component in the page 

- Interfaces as template for different games (2D, 3D, Zombie Cell etc.)
- Interfaces help to do lower coupling?
