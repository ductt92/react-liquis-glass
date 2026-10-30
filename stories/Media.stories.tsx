import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Flex, Segmented, Text } from 'react-liquis-glass';
import { Carousel, Image, ImagePreviewGroup } from 'react-liquis-glass';

const meta: Meta = { title: 'Media' };
export default meta;

const photos = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=70',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=70',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=70',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=70',
];

export const CarouselStory: StoryObj = {
  name: 'Carousel',
  render: () => {
    const [effect, setEffect] = React.useState<'slide' | 'fade'>('slide');
    return (
      <Flex vertical gap="md" style={{ maxWidth: 820 }}>
        <Segmented options={['slide', 'fade']} value={effect} onChange={(v) => setEffect(v as 'slide' | 'fade')} />
        <Carousel autoplay effect={effect} height={360}>
          {photos.map((p) => (
            <img key={p} src={p} alt="" />
          ))}
        </Carousel>
        <Carousel height={160} dots={false}>
          {['#0a84ff', '#bf5af2', '#ff375f'].map((c, i) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${c}, #fff4)`, color: '#fff', fontSize: 28, fontWeight: 700 }}>
              Slide {i + 1}
            </div>
          ))}
        </Carousel>
      </Flex>
    );
  },
};

export const ImageStory: StoryObj = {
  name: 'Image & Preview',
  render: () => (
    <Flex vertical gap="lg">
      <Card title="Single image" subtitle="Click to open the glass lightbox (zoom, rotate, Esc to close)">
        <Image src={photos[0]} width={280} height={180} alt="Mountains" />
      </Card>
      <Card title="Preview group" subtitle="Use ← / → in the lightbox to navigate">
        <ImagePreviewGroup>
          <Flex gap="sm" wrap>
            {photos.map((p) => (
              <Image key={p} src={p} width={160} height={110} alt="" />
            ))}
          </Flex>
        </ImagePreviewGroup>
      </Card>
      <Card title="Fallback">
        <Flex gap="sm" align="center">
          <Image src="https://invalid.example/nope.jpg" width={160} height={110} alt="broken" />
          <Text type="secondary">Broken source shows a fallback</Text>
        </Flex>
      </Card>
    </Flex>
  ),
};
