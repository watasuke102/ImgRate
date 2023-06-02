---
name: 'component'
root: './src/components'
output: '.'
ignore: []
questions:
  name: 'Component name: '
---

# `{{ pascal(inputs.name) }}.tsx`

```typescript
// ImGrate - Image gallery rated by favorites and comments
// {{ pascal(inputs.name) }}.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';

export function {{ pascal(inputs.name) }}(): JSX.Element {
  return(
    <></>
  );
}

```
