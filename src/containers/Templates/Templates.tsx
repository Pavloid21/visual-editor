import React from 'react';
import {ButtonSelector} from 'components';
import {v4} from 'uuid';
import {H1, P} from '../Project/Project.styled';
import {Container, Content, TemplatesContainer} from './Templates.styled';
import {TemplatePreview} from './TemplatePreview/TemplatePreview';
import {useSelector} from 'react-redux';
import {RootStore} from 'store/types';

export const Templates: React.FC<unknown> = () => {
  const projectForm = useSelector((state: RootStore) => state.projectForm);
  return (
    <>
      <Container>
        <H1>Templates</H1>
        <P>Choose a template and adapt it to your goals</P>
        <Content>
          <ButtonSelector
            buttons={[
              {title: 'Business', key: 'business', uuid: v4()},
              {title: 'Lifestyle', key: 'lifestyle', uuid: v4()},
              {title: 'Entertainment', key: 'entertainment', uuid: v4()},
              {title: 'Utility', key: 'utility', uuid: v4()},
            ]}
            onChange={function (): void {
              throw new Error('Function not implemented.');
            }}
            value={'business'}
          />
          <TemplatesContainer>
            <TemplatePreview projectData={projectForm} />
          </TemplatesContainer>
        </Content>
      </Container>
    </>
  );
};
