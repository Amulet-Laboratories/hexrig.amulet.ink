import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RigTable from '@rig/components/RigTable.vue'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'url', label: 'URL', align: 'right' as const },
]

const rows = [
  { id: '1', name: 'amulet.ink', status: 'active', url: 'https://amulet.ink' },
  { id: '2', name: 'labs.amulet.ink', status: 'active', url: 'https://labs.amulet.ink' },
  { id: '3', name: 'press.amulet.ink', status: 'pending', url: 'https://press.amulet.ink' },
]

describe('RigTable', () => {
  const mountTable = (props: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) => {
    return mount(RigTable, {
      props: { columns, rows, ...props },
      slots,
      global: { stubs: { RigCheckbox: true, RigSkeleton: true } },
    })
  }

  it('renders column headers', () => {
    const wrapper = mountTable()
    expect(wrapper.find('thead').text()).toContain('Name')
    expect(wrapper.find('thead').text()).toContain('Status')
    expect(wrapper.find('thead').text()).toContain('URL')
  })

  it('renders row data', () => {
    const wrapper = mountTable()
    expect(wrapper.find('tbody').text()).toContain('amulet.ink')
    expect(wrapper.find('tbody').text()).toContain('labs.amulet.ink')
    expect(wrapper.find('tbody').text()).toContain('press.amulet.ink')
  })

  it('renders correct number of rows', () => {
    const wrapper = mountTable()
    const dataRows = wrapper.findAll('tbody tr')
    expect(dataRows).toHaveLength(3)
  })

  it('emits update:sortBy when sortable header is clicked', async () => {
    const wrapper = mountTable()
    const nameHeader = wrapper.findAll('th').find((th) => th.text().includes('Name'))
    await nameHeader!.trigger('click')
    expect(wrapper.emitted('update:sortBy')).toBeTruthy()
    expect(wrapper.emitted('update:sortBy')![0]).toEqual(['name'])
  })

  it('toggles sort direction when same column is clicked', async () => {
    const wrapper = mountTable({ sortBy: 'name', sortDir: 'asc' })
    const nameHeader = wrapper.findAll('th').find((th) => th.text().includes('Name'))
    await nameHeader!.trigger('click')
    expect(wrapper.emitted('update:sortDir')![0]).toEqual(['desc'])
  })

  it('sets aria-sort on sortable headers', () => {
    const wrapper = mountTable({ sortBy: 'name', sortDir: 'asc' })
    const nameHeader = wrapper.findAll('th').find((th) => th.text().includes('Name'))
    expect(nameHeader!.attributes('aria-sort')).toBe('ascending')
  })

  it('does not emit sort on non-sortable columns', async () => {
    const wrapper = mountTable()
    const statusHeader = wrapper.findAll('th').find((th) => th.text().includes('Status'))
    await statusHeader!.trigger('click')
    expect(wrapper.emitted('update:sortBy')).toBeUndefined()
  })

  it('emits row-click when a row is clicked', async () => {
    const wrapper = mountTable()
    const firstRow = wrapper.findAll('tbody tr')[0]
    await firstRow.trigger('click')
    expect(wrapper.emitted('row-click')).toHaveLength(1)
    expect(wrapper.emitted('row-click')![0][0]).toHaveProperty('name', 'amulet.ink')
  })

  it('shows empty state when rows is empty', () => {
    const wrapper = mountTable({ rows: [] })
    expect(wrapper.text()).toContain('No data')
  })

  it('shows custom empty title', () => {
    const wrapper = mountTable({ rows: [], emptyTitle: 'Nothing here' })
    expect(wrapper.text()).toContain('Nothing here')
  })

  it('shows skeleton rows when loading', () => {
    const wrapper = mountTable({ loading: true })
    // Should find RigSkeleton stubs
    expect(wrapper.findAllComponents({ name: 'RigSkeleton' }).length).toBeGreaterThan(0)
  })

  it('renders expandable toggle when expandable is true', () => {
    const wrapper = mountTable({ expandable: true })
    expect(wrapper.find('[aria-label="Expand row"]').exists()).toBe(true)
  })

  it('expands row on toggle click and emits row-expand', async () => {
    const wrapper = mountTable(
      { expandable: true },
      { expanded: ({ row }: { row: Record<string, unknown> }) => `Details for ${row.name}` },
    )
    const expandBtn = wrapper.find('[aria-label="Expand row"]')
    await expandBtn.trigger('click')
    expect(wrapper.emitted('row-expand')).toHaveLength(1)
    expect(wrapper.emitted('row-expand')![0][0]).toHaveProperty('expanded', true)
  })

  it('renders custom cell slot', () => {
    const wrapper = mountTable(
      {},
      { 'cell-name': ({ value }: { value: unknown }) => `Custom: ${value}` },
    )
    expect(wrapper.text()).toContain('Custom: amulet.ink')
  })

  it('applies striped classes when striped is true', () => {
    const wrapper = mountTable({ striped: true })
    const firstRow = wrapper.findAll('tbody tr')[0]
    expect(firstRow.classes()).toContain('even:bg-surface-sunken')
  })

  it('applies compact padding', () => {
    const wrapper = mountTable({ compact: true })
    const cell = wrapper.find('tbody td')
    expect(cell.classes()).toContain('px-3')
    expect(cell.classes()).toContain('py-1.5')
  })
})
