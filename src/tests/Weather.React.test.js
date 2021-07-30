import React from 'react';
import renderer from 'react-test-renderer';

import Weather from '../Components/Weather';

//Snapshot Test
test("snapshot for weather component", () => {
    const tree = renderer.create(<Weather />).toJSON();
    expect(tree).toMatchSnapshot();
})

//API fetch function test
async function withFetch() {
    const res = await fetch("https://api.openweathermap.org/data/2.5/")
    const json = await res.json()
  
    return json
  }
  
  const unmockedFetch = global.fetch
  
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
  })
  
  afterAll(() => {
    global.fetch = unmockedFetch
  })
  
  
  describe('Weather', () => {
    test('fetch test', async () => {
      const json = await withFetch()
      
      expect.extend({
        yourMatcher() {
          return {
            pass: true,
            message: () => 'error',
          };
        },
      });
    })
  })