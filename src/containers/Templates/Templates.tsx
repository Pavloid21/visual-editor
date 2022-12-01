import React, {useEffect, useState} from 'react';
import {ButtonSelector} from 'components';
import {v4} from 'uuid';
import {H1, P} from '../Project/Project.styled';
import {Container, Content, TemplatesContainer} from './Templates.styled';
import {TemplatePreview} from './TemplatePreview/TemplatePreview';
import {useAppSelector} from 'store';
import {Template} from 'store/types';
import {getTemplateData, getTemplates} from 'services/ApiService';
import {AxiosResponse} from 'axios';
import {ITemplatePreview} from './types';

export const Templates: React.FC<unknown> = () => {
  const {projectForm} = useAppSelector((state) => state);
  const [templates, setTemplates] = useState<ITemplatePreview[]>([]);

  const getTemplatesList = async () => {
    await getTemplates().then((templates: AxiosResponse) => {
      if (templates.data) {
        const promises: Promise<AxiosResponse>[] = templates.data.map((template: string) => getTemplateData(template));
        Promise.allSettled(promises).then((data: PromiseSettledResult<AxiosResponse<Template, any>>[]) => {
          setTemplates(
            data.map((item: any) => {
              const {data} = item.value;
              return {
                project: projectForm,
                template: data
              };
            })
          );
        });
      }
    });
  };

  useEffect(() => {
    getTemplatesList();
  }, []);

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
            <TemplatePreview project={projectForm} />
            {templates.map((template) => {
              return <TemplatePreview key={template.template?.id} {...template} />;
            })}
          </TemplatesContainer>
        </Content>
      </Container>
    </>
  );
};
