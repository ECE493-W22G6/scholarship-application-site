import React from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';
import userTypes from './websites.json';

const Page = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  overflow-x: auto;
  scroll-behavior: smooth;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-left: calc(50vw - 150px);

  > button {
    margin-right: 40px;
  }
`;

const LandingPage = () => {
    return (
        <Page>
            <Grid>
                {userTypes.map((userType) => (
                    <Card
                        key={userType.description}
                        hexa={userType.hexa}
                        user={userType.user}
                        description={userType.description}
                        image={userType.image}
                    />
                ))}
            </Grid>
        </Page>
    );
};

export default LandingPage;
