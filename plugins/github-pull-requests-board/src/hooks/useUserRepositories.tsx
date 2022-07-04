/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useApi } from '@backstage/core-plugin-api';
import { useEntity, catalogApiRef } from '@backstage/plugin-catalog-react';
import { useCallback, useEffect, useState } from 'react';
import { getProjectNameFromEntity } from '../utils/functions';

export function useUserRepositories() {
  const { entity: teamEntity } = useEntity();
  const catalogApi = useApi(catalogApiRef);
  const [repositories, setRepositories] = useState<string[]>([]);

  const getRepositoriesNames = useCallback(async () => {
    const entitiesList = await catalogApi.getEntities({
      filter: {
        kind: 'Component',
        'spec.type': 'service',
        'spec.owner': teamEntity?.metadata?.name,
      },
    });

    const entitiesNames: string[] = entitiesList.items.map(componentEntity =>
      getProjectNameFromEntity(componentEntity),
    );

    setRepositories([...new Set(entitiesNames)]);
  }, [catalogApi, teamEntity?.metadata?.name]);

  useEffect(() => {
    getRepositoriesNames();
  }, [getRepositoriesNames]);

  return {
    repositories,
  };
}
