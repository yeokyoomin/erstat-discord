import { config } from '../config'
import axios from 'axios';

export async function get_root_info(route_id: string) {
    let response
    console.log(`${config.req_url}/route/${route_id}`)
    try {
        response = await axios.get(
            `${config.req_url}/route/${route_id}`,
            {
                headers: {
                    "x-api-key": config.api_key
                },
            }
        );
        return response.data
    } catch (error: any) {
        return console.error("ER ROUTE API 요청 실패:", error.response?.data || error.message);
    }
}