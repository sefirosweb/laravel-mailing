<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelMailing\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MailingListRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->input('mailing_lists_id', $this->input('id'));

        return [
            'name' => [
                'required',
                'min:2',
                'max:255',
                'unique:Sefirosweb\LaravelMailing\Http\Models\MailingList,name,' . $id,
            ],
            'code' => [
                'required',
                'min:2',
                'max:255',
                'unique:Sefirosweb\LaravelMailing\Http\Models\MailingList,code,' . $id,
            ],
            'description' => [
                'max:255',
            ],
        ];
    }
}
