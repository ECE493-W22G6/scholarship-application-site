// import React from 'react';

// const Content = styled.div`
//   z-index: 200;
//   position: relative;
//   padding: 20px 20px 30px;
// `;

// const User = styled.span`
//   display: block;
//   font-size: 1.25em;
//   font-weight: 500;
//   margin-bottom: 4px;
//   transition: all 0.5s ease;
// `;

// const Icon = styled.figure`
//   position: relative;
//   margin: 0;
//   width: 320px;
//   height: 300px;
//   background: url(${(props) => props.image}) 0 0 no-repeat;
//   background-size: cover;
//   overflow: hidden;
//   backface-visibility: hidden;
//   transition: all 0.5s ease;

//   &::before {
//     content: '';
//     position: absolute;

//     background: rgba(0, 0, 0, 0);
//     transition: all 0.5s ease;
//   }
// `;

// const Description = styled.span`
//   display: block;
//   font-size: 0.875em;
//   color: #999999;
//   transition: all 0.5s ease;
//   transition-delay: 0.04s;
// `;

// const Button = styled.button`
//   /* Adapt the colors based on primary prop */
//   background: ${props => props.primary ? "palevioletred" : "white"};
//   color: ${props => props.primary ? "white" : "palevioletred"};

//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
// `;

// const BottomBar = styled.span`
//   position: absolute;
//   width: 100%;
//   height: 10px;
//   bottom: 0;
//   left: 0;
//   background: ${(props) => props.background && props.background};
//   transition: all 0.5s ease;
// `;

// const Style = styled.button`
//   position: relative;
//   flex-shrink: 0;
//   width: 320px;
//   text-align: left;
//   cursor: pointer;
//   box-shadow: 0 2px 20px rgba(0, 0, 0, 0.12),
//     0 20px 20px -10px rgba(0, 0, 0, 0.125);
//   transition: all 0.5s ease;

//   &:hover {
//     transform: scale(1.04);

//     ${Icon} {
//       transform: translateY(4px) scale(0.92);
//     }

//     ${User} {
//       transform: translateY(-10px);
//     }

//     ${Description} {
//       transform: translateY(-12px);
//     }

//     ${BottomBar} {
//       transform: translateY(-14px) scale(0.9);
//     }
//   }
// `;

// const Card = ({ hexa, user, description, image }) => (
// 	<Style>
// 		<Icon image={image} />
// 		<Content>
// 			<User>{user}</User>
// 			<Description>{description}</Description>
//       <Button>Log In</Button>
//       <Button primary>Sign Up</Button>
// 			<BottomBar background={hexa} />
// 		</Content>
// 	</Style>
// );

// export default Card;
