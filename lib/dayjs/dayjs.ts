import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";

import "dayjs/locale/de";

dayjs.extend(localeData);
dayjs.extend(weekday);

// dayjs.locale("de", {
//   weekStart: 1, // Set Monday as the first day of the week
// });

export default dayjs;
