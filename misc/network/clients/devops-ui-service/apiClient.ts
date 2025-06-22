import { buildApiClient } from '../../network-hooks';
import {
  UiServiceApi,
  JiraComponentsApi,
} from '@clients/devops-ui-service-api-client';

const devopsUiServiceClient = buildApiClient(
  UiServiceApi,
  '/api/ui-service/v1',
);

const jiraComponentClient = buildApiClient(
  JiraComponentsApi,
  '/api/ui-service/v1',
);

export { devopsUiServiceClient, jiraComponentClient };
