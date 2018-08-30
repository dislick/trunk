import { RootAction, RootState } from "../../reducer";
import { Epic, combineEpics, ofType } from 'redux-observable';
import { tap, ignoreElements, filter, mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { isOfType, isActionOf } from "typesafe-actions";
import { authActions } from ".";
import { from, pipe } from "rxjs";
import { submitLogin } from "./actions";
import { fetchSomething } from "./services";

export const fetchLoginEpic: Epic<RootAction> = (action$) =>
  action$.pipe(
    filter(isActionOf(authActions.submitLogin.request)),
    switchMap(() => {
      return from(fetchSomething()).pipe(map(submitLogin.success))
    }),
  );
