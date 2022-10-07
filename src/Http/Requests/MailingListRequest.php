<?php

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
        return [
            'name' => [
                'required',
                'min:2',
                'max:255',
                'unique:Sefirosweb\LaravelMailing\Http\Models\MailingList,name,' . $this->id
            ],
            'code' => [
                'required',
                'min:2',
                'max:255',
                'unique:Sefirosweb\LaravelMailing\Http\Models\MailingList,code,' . $this->id
            ],
            'description' => [
                'max:255',
            ],
        ];
    }
}
