import { stopEventPropagation } from '@lib/stopEventPropagation';
import type { Profile } from 'lens';
import Link from 'next/link';
import type { FC } from 'react';
import type { MarkupLinkProps } from 'src/types';
import formatHandle from 'utils/formatHandle';

import Slug from '../../Slug';
import UserPreview from '../../UserPreview';

const Mention: FC<MarkupLinkProps> = ({ href, title = href }) => {
  const handle = title?.slice(1);

  if (!handle) {
    return null;
  }

  const profile = {
    __typename: 'Profile',
    handle: handle,
    name: null,
    id: null
  };

  return (
    <Link href={`/u/${formatHandle(handle)}`} onClick={stopEventPropagation}>
      {profile?.handle ? (
        <UserPreview isBig={false} profile={profile as Profile} followStatusLoading={false}>
          <Slug slug={formatHandle(handle)} prefix="@" />
        </UserPreview>
      ) : (
        <Slug slug={formatHandle(handle)} prefix="@" />
      )}
    </Link>
  );
};

export default Mention;
