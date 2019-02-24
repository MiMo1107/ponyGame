import axios, { AxiosResponse } from 'axios';

export const HOST = 'https://ponychallenge.trustpilot.com';

const ENDPOINT = '/pony-challenge/maze';

export function createMaze(width: number, height: number, pony: string, difficulty: number):
 Promise<string> {
  return axios.post(HOST + ENDPOINT, {
    difficulty,
    'maze-height': height,
    'maze-player-name': pony,
    'maze-width': width,
  }).then((response: AxiosResponse<any>) => {
    const { data } = response;
    return data.maze_id;
  });
}

export function getMaze(id: string): Promise<object> {
  return axios.get(`${HOST + ENDPOINT}/${id}`).then(
    (response: AxiosResponse<any>) => {
      const { data } = response;
      return {
        domokun: data.domokun,
        end: data['end-point'],
        fields: data.data,
        height: data.size[1],
        pony: data.pony,
        width: data.size[0],
      };
    });
}

export function move(id: string, direction: string): Promise<object> {
  return axios.post(`${HOST + ENDPOINT}/${id}`, {
    direction,
  }).then((response: AxiosResponse<any>) => {
    const { data } = response;
    return data;
  });
}
