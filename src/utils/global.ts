import JSEncrypt from 'jsencrypt'
import { getPublicKey } from '@/api/key'

// 加密密码
export async function encryptPassword(password: string): Promise<string> {
    if (!password) return ''
    let publicKey = ''
    const res:any = await getPublicKey()
    console.log(res)
    if (res.code === 200) {
      publicKey = res.data
    } else {
      throw new Error('获取公钥失败')
    }
    // 根据后端返回的数据格式处理
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    const encryptedPassword = encrypt.encrypt(password)
    
    if (!encryptedPassword) {
      throw new Error('加密失败')
    }
    
    return encryptedPassword
}

// 使用示例