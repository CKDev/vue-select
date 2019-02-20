import { mount, shallowMount } from '@vue/test-utils'
import Select from '@/select.vue'

import States from './data/states.json'
import Cocktails from './data/cocktails.json'

describe('select.vue', () => {
  it('should render a vue instance', () => {
    const wrapper = shallowMount(Select)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should have an empty array as default options', () => {
    const wrapper = shallowMount(Select)
    expect(wrapper.props().options).toEqual([])
  })

  it('should not be open by default', () => {
    const wrapper = shallowMount(Select)
    expect(wrapper.vm.open).toBeFalsy()
  })

  it('should not be focused by default', () => {
    const wrapper = shallowMount(Select)
    expect(wrapper.vm.focused).toBeFalsy()
  })

  it('should not be focused by default', () => {
    const wrapper = shallowMount(Select)
    expect(wrapper.vm.focused).toBeFalsy()
  })

  it('should display the placeholder if no value selected', () => {
    const wrapper = shallowMount(Select, { propsData: { placeholder: 'Hello World' } })
    expect(wrapper.find('.label').text()).toEqual('Hello World')
  })

  it('should be opened when label is clicked', () => {
    const wrapper = shallowMount(Select)
    wrapper.find('.label').trigger('click')
    expect(wrapper.vm.open).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should change the selection to the clicked option', () => {
    const wrapper = mount(Select, { propsData: { options: States } })
    const options = wrapper.findAll('.v-option:not(.is-disabled)')
    const option = options.at(Math.floor(Math.random() * options.length))
    expect(wrapper.vm.selection).toBeFalsy()
    option.trigger('click')
    expect(wrapper.vm.selection).toEqual(option.vm.option)
  })

  it('should have a single hovered option on mouseover', () => {
    const wrapper = mount(Select, { propsData: { options: States } })
    const options = wrapper.findAll('.v-option:not(.is-disabled)')
    const option = options.at(Math.floor(Math.random() * options.length))
    expect(options.filter(o => o.vm.option.state.hovered).length).toEqual(0)
    option.trigger('mouseover')
    expect(options.filter(o => o.vm.option.state.hovered).length).toEqual(1)
  })

  it('should emit the input event when the selection changed', (done) => {
    const wrapper = mount(Select, { propsData: { options: States } })
    const options = wrapper.findAll('.v-option:not(.is-disabled)')
    const option = options.at(Math.floor(Math.random() * options.length))
    option.trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted().input).toBeTruthy()
      done()
    })
  })

  it('should emit the change event when the selection changed', (done) => {
    const wrapper = mount(Select, { propsData: { options: States } })
    const options = wrapper.findAll('.v-option:not(.is-disabled)')
    const option = options.at(Math.floor(Math.random() * options.length))
    option.trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted().change).toBeTruthy()
      done()
    })
  })

  it('should move to prev/next available option on arrow key press', (done) => {
    const wrapper = mount(Select, { propsData: { options: States } })
    const options = wrapper.findAll('.v-option:not(.is-disabled)')
    const initialIndex = options.at(Math.floor(options.length / 2)).vm.option.state.index
    wrapper.setData({ open: true, highlightIndex: initialIndex })
    wrapper.trigger('keydown.down')
    console.log(wrapper.find('.v-option.is-highlighted').vm.option)

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.v-option.is-highlighted').vm.option.state.index).toBeGreaterThan(initialIndex)
      wrapper.trigger('keydown.up')
      wrapper.trigger('keydown.up')
      expect(wrapper.find('.v-option.is-highlighted').vm.option.state.index).toBeLessThan(initialIndex)
      done()
    })
  })

  it('should highlight the currently hovered option on keypress', () => {
    const wrapper = mount(Select, { propsData: { options: States } })
    const options = wrapper.findAll('.v-option:not(.is-disabled)')
    const initialIndex = options.at(Math.floor(options.length / 2)).vm.option.state.index
    wrapper.setData({ open: true, hoverIndex: initialIndex })
    expect(wrapper.vm.highlightIndex).toEqual(-1)
    wrapper.trigger('keydown.down')
    expect(wrapper.vm.highlightIndex).toEqual(initialIndex)
  })

  it('should highlight the first available option on keypress', () => {
    const wrapper = mount(Select, { propsData: { options: States } })
    const option = wrapper.find('.v-option:not(.is-disabled)')
    wrapper.trigger('keydown.down')
    expect(wrapper.vm.highlightIndex).toEqual(option.vm.option.state.index)
    expect(wrapper).toMatchSnapshot()
  })

  describe('when closed', () => {
    it('should open when space key is pressed', () => {
      const wrapper = shallowMount(Select)
      wrapper.setData({ focused: true })
      wrapper.trigger('keydown.space')
      expect(wrapper.vm.open).toBeTruthy()
    })
  })

  describe('when open', () => {
    it('should close when the escape key is pressed', () => {
      const wrapper = shallowMount(Select)
      wrapper.setData({ open: true })
      wrapper.trigger('keydown.esc')
      expect(wrapper.vm.open).toBeFalsy()
    })

    it('should close when the tab key is pressed', () => {
      const wrapper = shallowMount(Select)
      wrapper.setData({ open: true, focused: true })
      wrapper.trigger('keydown.tab')
      expect(wrapper.vm.open).toBeFalsy()
    })

    it('should close when the enter key is pressed', () => {
      const wrapper = shallowMount(Select)
      wrapper.setData({ open: true })
      wrapper.trigger('keydown.enter')
      expect(wrapper.vm.open).toBeFalsy()
    })

    it('should have an open state when opened', () => {
      const wrapper = shallowMount(Select)
      wrapper.find('.label').trigger('click')
      expect(wrapper.vm.open).toBeTruthy()
    })

    it('should have a focused state when focused', () => {
      const wrapper = shallowMount(Select)
      wrapper.trigger('focus')
      expect(wrapper.vm.focused).toBeTruthy()
    })

    it('should close when no longer focused', () => {
      const wrapper = shallowMount(Select)
      wrapper.trigger('focus')
      wrapper.setData({ open: true })
      wrapper.trigger('blur')
      expect(wrapper.vm.open).toBeFalsy()
    })
  })

  describe('with no highlighted options', () => {
    it('should select the hovered option when tab key pressed', () => {
      const wrapper = mount(Select, { propsData: { options: States } })
      const options = wrapper.findAll('.v-option:not(.is-disabled)')
      const option = options.at(Math.floor(Math.random() * options.length))
      wrapper.setData({ open: true, focused: true, hoverIndex: option.vm.option.state.index })
      wrapper.trigger('keydown.tab')
      expect(wrapper.vm.selection).toEqual(option.vm.option)
    })
  })

  describe('with a highlighted option', () => {
    it('should select the highlighted option when tab key pressed', () => {
      const wrapper = mount(Select, { propsData: { options: States } })
      const options = wrapper.findAll('.v-option:not(.is-disabled)')
      const option = options.at(Math.floor(Math.random() * options.length))
      wrapper.setData({ open: true, focused: true, highlightIndex: option.vm.option.state.index })
      wrapper.trigger('keydown.tab')
      expect(wrapper.vm.selection).toEqual(option.vm.option)
    })
  })
})
