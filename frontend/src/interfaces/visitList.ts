import { AxiosResponse } from "axios";

export type TVisitList = {
  [groupId: string]: TVisitListYear;
};

export type TVisitListYear = {
  [year: string]: {
    [month: string]: TVisitListStudents;
  };
};

export type TVisitListStudents = {
  [studentId: string]: {
    [day: string]: string;
  };
};

export interface IColumnVisitList {
  key: string;
  student: string;
  days: string[] | undefined;
}

export interface IRequestVisitList {
  groupId: string;
  year: string;
  month: string;
}

export interface IVisitListApi {
  /** Получить данные посещения группы по дате. */
  getVisitList(data: IRequestVisitList): Promise<AxiosResponse<TVisitList>>;

  /** Создать или обновить данные посещения группы по дате */
  setVisitList(data: TVisitList): Promise<AxiosResponse>;
}

export const visitList: TVisitList = {
  1: {
    2023: {
      February: {
        1: {
          11: "frozen",
          12: "absent",
        },
        5: {
          13: "sick",
          14: "absent",
        },
      },
      May: {
        8: {
          21: "sick",
          22: "absent",
        },
        14: {
          23: "frozen",
          24: "present",
        },
      },
      April: {
        8: {
          1: "sick",
          21: "sick",
          22: "absent",
        },
        14: {
          23: "frozen",
          24: "present",
        },
      },
    },
  },
  2: {
    2023: {
      June: {
        49: {
          10: "frozen",
          11: "present",
        },
        51: {
          12: "frozen",
          13: "absent",
        },
      },
      September: {
        54: {
          2: "frozen",
          20: "frozen",
          22: "absent",
        },
        55: {
          23: "present",
          24: "absent",
        },
      },
    },
  },
};
