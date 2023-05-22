import {ReactElement} from 'react';

const RenderIf = ({
  isTrue,
  children,
}: {
  isTrue: boolean;
  children: ReactElement;
}): ReactElement | null => (isTrue ? children : null);

export default RenderIf;
