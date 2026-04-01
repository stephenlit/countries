import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useCountries } from './useCountries'

async function flushPromises() {
  await Promise.resolve()
  await nextTick()
}

describe('useCountries', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('maps API data into composable country state', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => [
        {
          name: 'Canada',
          nativeName: 'Canada',
          population: 38000000,
          region: 'Americas',
          subregion: 'North America',
          capital: 'Ottawa',
          flag: 'https://flagcdn.com/ca.svg',
          tld: ['.ca'],
          currencies: [{ code: 'CAD', name: 'Canadian dollar', symbol: '$' }],
          languages: [{ name: 'English' }, { name: 'French' }],
          borders: ['USA'],
          cca2: 'CA',
        },
      ],
    } as Response)

    let state: ReturnType<typeof useCountries> | undefined

    const Harness = defineComponent({
      setup() {
        state = useCountries()
        return () => null
      },
    })

    mount(Harness)
    await flushPromises()

    expect(state).toBeDefined()
    expect(state?.loading.value).toBe(false)
    expect(state?.error.value).toBeNull()
    expect(state?.countries.value).toHaveLength(1)
    expect(state?.countries.value[0]).toMatchObject({
      name: 'Canada',
      languages: 'English, French',
      tld: '.ca',
      cca2: 'CA',
    })
  })

  it('captures fetch failures into error state', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network down'))

    let state: ReturnType<typeof useCountries> | undefined

    const Harness = defineComponent({
      setup() {
        state = useCountries()
        return () => null
      },
    })

    mount(Harness)
    await flushPromises()

    expect(state).toBeDefined()
    expect(state?.loading.value).toBe(false)
    expect(state?.countries.value).toEqual([])
    expect(state?.error.value).toBe('Network down')
  })
})
