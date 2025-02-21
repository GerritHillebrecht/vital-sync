import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";

import "dayjs/locale/de";

dayjs.extend(localeData);
dayjs.extend(weekday);

export default dayjs;
