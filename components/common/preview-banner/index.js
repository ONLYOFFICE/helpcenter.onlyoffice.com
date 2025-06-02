'use client';

import { useRouter } from 'next/navigation';
import { Wrapper, Container, Text, Button } from './styled-preview-banner';

export default function PreviewBanner() {
  const router = useRouter();


  return (
    <Wrapper>
      <Container>
        <Text>
          Your are using the draft mode{" "}
          <Button
            onClick={(e) => {
              e.preventDefault();
              fetch("/api/exit-preview").then(() => {
                router.refresh();
              });
            }}
          >
            Exit draft mode
          </Button>
        </Text>
      </Container>
    </Wrapper>
  );
}