import * as v from 'valibot';

export const BookInputSchema = v.object({
  title: v.string(),
  author: v.string(),
});
