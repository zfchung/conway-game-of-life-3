
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

7-Dec
- For an infinite size boardgame, we can try to  get the boundary of the board by understanding the largest/smallest row or column of livecells

- Aim: we don't want the World to be tied up with the implementation of the dimension of the board 
    - we do need to calculate the boundary of the board, this could be done out side of the World class by either putting it in an Interface which the World class can use/change it when it's a 2D or 3D etc. 
    - or it could be in the Coordinate class instead 

- how to generate or parse id should be with coordinate instead of world class

- Interface for Coordinate (iCoordinate) to separate 2D and 3D implementation, which the World just need to interact the consistent methods of 2D and 3D

jest integration test
1. yarn dev --world="1_1,1_2,2_1,2_2"
2. get result from cli
3. compared with expected result
4. pass or fail 

